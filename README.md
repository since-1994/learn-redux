# Redux

## 설치

`$yarn add redux`

## createStore

store는 redux에서 데이터를 보관하는 곳이라는 의미를 갖습니다.

```javascript
import { createStore } from "redux";
```

## reducer

createStore를 이용하여 store를 생성할 때 reducer라는 함수를 인자로 전달해줘야 합니다. 우리가 관리하고자 하는 data는 오직 reducer에 의해서만 변경이 이루어집니다. reducer에 전달할 인자로는 state와 action이 있습니다. state는 data를 말하고 action은 우리가 data에 어떤 작업을 할지에 대한 내용을 의미합니다.

```javascript
const reducer = (count = 0, action) => {
    swith(action.type){
        case 'ADD':
            return count + 1;
        case 'MINUS':
            return count - 1;
        default:
            return count;
    }
};

const store = createStore(reducer);
```

## store.dispatch

reducer에 의해서만 변경이 이루어진다고 했습니다. reducer를 사용하기 위해서 dispatch라는 함수를 사용하면 dispatch에는 action을 객체형태로 전달해주면 됩니다. 'ADD'동작을 하기 위한 코드는 아래와 같습니다.

```javascript
const reducer = () => {...}

const store = createStore(reducer);

store.dispatch({type:'ADD'});
```

## store.getState()

store에 담긴 값을 가져오기 위해서는 getState()를 사용합니다.

```javascript
const reducer = ()=> {(...)};

const store = createStore(reducer);

store.dispatch({type:'ADD'});
console.log(store.getState());// 1
```

## store.subscribe()

store에 담긴 값에 변화가 생겼을 때 특정 함수를 실행하고 싶다면 subscribe를 사용하면 되며 인자로 특정 시점에 실행할 함수를 전달해줍니다.

```javascript
const reducer = ()=> {(...)};

const store = createStore(reducer);

store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch({type:'ADD'});
//변경이 되었으므로 콘솔창에 1이 출력됩니다.

```

## react-redux

### 설치

`$yarn add react-redux`

### Provider

Provider는 react에사 react가 제공하는 component입니다. Provider에는 store라는 property를 전달해야 합니다. store로 우리가 생성한 store를 전달해주면 됩니다. Provider로 감싼 부분에서는 store의 데이터를 읽을 수 있게 됩니다.

### connect

connect는 두개의 인자를 받고 함수를 return해주며 return한 함수는 component를 인자로 받습니다. connect가 받는 두개의 인자는 mapStateToProps와 mapDispatchToProps입니다. 각 인자는 아래에서 더욱 자세히 알아봅니다.

## [mapStateToProps](https://react-redux.js.org/using-react-redux/connect-mapstate)

우선 react에서 큰 흐름 중 하나는 component에 정보를 전달하는 것이 props를 통해서 이루어진다는 것입니다. 따라서 getState()를 사용해서 component에서 받아오는 것이 아니라 mapStateToProps를 정의하여 props로 전달하는 것이 가능합니다. 아래와 같이 정의 가능하며 mapStateToProps가 return 하는 값이 component의 props에 추가됩니다.

```javascript
import {connect} from 'react-redux';
(...)

const Home = ({todos}) => {
    (...)
}

const mapStateToProps = (state, ownProps) => { // state는 store로부터 온 state, ownProps는 원래 component가 갖는 props
    return {todos: state} //객체를 return 해야합니다.
}

export default connect(mapStateToProps)(Home);
```

## mapDispatchToProps

mapDispatchToProps은 사용방법은 mapStateToProps와 비슷한데요. dispatch와 ownProps를 인자로 받는 함수로서 return하는 dispatch 함수가 component의 props에 추가됩니다.

```javascript
import {connect} from 'react-redux';
(...)

const Home = ({dispatch}) => {
    (...)
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {dispatch};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```
