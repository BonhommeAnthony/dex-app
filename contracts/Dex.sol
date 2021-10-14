pragma solidity ^0.8.7;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Dex {
    
     enum Side {
        BUY,
        SELL
    }
    
    struct Token {
        bytes32 ticker;
        address tokenAddress;
    }
    
    struct Order {
        uint id;
        address trader;
        Side side;
        bytes32 ticker;
        uint amount;
        uint filled;
        uint price;
        uint date;
    }
    
    mapping(bytes32 => Token) public tokens;
    bytes32[] public tokenList;
    mapping(address => mapping(bytes32 => uint)) public traderBalances;
    mapping(bytes32 => mapping(uint => Order[])) public orderBook;
    address public admin;
    uint public nextOrderId;
    uint public nextTradeId;
    bytes32 constant DAI = bytes32("DAI");
    
    event NewTrade(
        uint trade,
        uint orderId,
        bytes32 indexed ticker,
        address indexed trader1,
        address indexed trader2,
        uint amount,
        uint price,
        uint date
        );
    
    constructor()  {
        admin = msg.sender;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin is allowed");
        _;
    }
    
    modifier tokenExist(bytes32 _ticker) {
        require(tokens[_ticker].tokenAddress != address(0),"this token does not exist");
        _;
    }
    
    modifier tokenIsNotDai(bytes32 _ticker) {
         require(_ticker != DAI,"cannot trade DAI");
         _;
    }
    
    function addToken(bytes32 _ticker, address _tokenAddress) external onlyAdmin() {
        tokens[_ticker] = Token(_ticker,_tokenAddress);
        tokenList.push(_ticker);
    }
    
    function deposit(uint _amount, bytes32 _ticker) external tokenExist(_ticker) {
        IERC20(tokens[_ticker].tokenAddress).transferFrom(msg.sender,address(this),_amount);
        traderBalances[msg.sender][_ticker] += _amount;
    }
    
    function withdraw(uint _amount, bytes32 _ticker) external tokenExist(_ticker) {
        require(traderBalances[msg.sender][_ticker] >= _amount, "balance too low");
        traderBalances[msg.sender][_ticker] -= _amount;
        IERC20(tokens[_ticker].tokenAddress).transfer(msg.sender, _amount);
    }
    
     function getOrders(bytes32 ticker, Side side) external view returns(Order[] memory) {
      return orderBook[ticker][uint(side)];
    }

    function getTokens() external view returns(Token[] memory) {
      Token[] memory _tokens = new Token[](tokenList.length);
      for (uint i = 0; i < tokenList.length; i++) {
        _tokens[i] = Token(
          tokens[tokenList[i]].ticker,
          tokens[tokenList[i]].tokenAddress
        );
      }
      return _tokens;
    }
    
    function createMarketOrder(bytes32 _ticker, uint _amount, Side _side) external tokenExist(_ticker) tokenIsNotDai(_ticker) {
        if(_side == Side.SELL) {
            require(traderBalances[msg.sender][_ticker] >= _amount, "balance too low");
        }
        Order[] storage orders = orderBook[_ticker][uint(_side == Side.BUY ? Side.SELL : Side.BUY) ];
        uint i;
        uint remaining = _amount;
        
        while(i < orders.length && remaining > 0) {
            uint available = orders[i].amount - orders[i].filled;
            uint matched = (remaining > available) ? available : remaining;
            remaining -= matched;
            orders[i].filled += matched;
            emit NewTrade(
                nextTradeId,
                orders[i].id,
                _ticker,
                orders[i].trader,
                msg.sender,
                matched,
                orders[i].price,
                block.timestamp
                );
                if(_side == Side.SELL) {
                    traderBalances[msg.sender][_ticker] -= matched;
                traderBalances[msg.sender][DAI] += matched * orders[i].price;
                traderBalances[orders[i].trader][_ticker] += matched;
                traderBalances[orders[i].trader][DAI] -= matched * orders[i].price;
                }
                 if(_side == Side.BUY) {
                require(traderBalances[msg.sender][DAI] >= matched * orders[i].price,"dai balance too low");
                traderBalances[msg.sender][_ticker] += matched;
                traderBalances[msg.sender][DAI] -= matched * orders[i].price;
                traderBalances[orders[i].trader][_ticker] -= matched;
                traderBalances[orders[i].trader][DAI] += matched * orders[i].price;
                }
                nextTradeId++;
                i++;
        }
        
        i = 0;
        while(i < orders.length && orders[i].filled == orders[i].amount) {
            for(uint j = i; j < orders.length - 1; j++) {
                orders[j] = orders[j + 1];
            }
            orders.pop();
            i++;
        }
    }
    
    function createLimitOrder(bytes32 _ticker, uint _amount, uint _price, Side _side) external tokenExist(_ticker) tokenIsNotDai(_ticker) {
        if(_side == Side.SELL) {
            require(traderBalances[msg.sender][_ticker] >= _amount, "token balance too low");
        } else {
            require(traderBalances[msg.sender][DAI] >= _amount * _price, "dai balance too low");
        }
        Order[] storage orders = orderBook[_ticker][uint(_side)];
        orders.push(Order(nextOrderId,msg.sender,_side,_ticker,_amount,0,_price,block.timestamp));
        
        uint i = orders.length > 0 ? orders.length - 1 : 0;
        while(i > 0) {
            if(_side == Side.BUY && orders[i - 1].price > orders[i].price) {
                break;
            }
            if(_side == Side.SELL && orders[i - 1].price < orders[i].price) {
                break;
            }
            Order memory order = orders[i-1];
            orders[i-1] = orders[i];
            orders[i] = order;
            i--;
        }
        nextOrderId++;
        
    }
    
}