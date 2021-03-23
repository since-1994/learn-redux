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
