# Redux

## 설치

`$yarn add redux`

## createStore

store는 redux에서 데이터를 보관하는 곳이라는 의미를 갖습니다.

```javascript
import { createStore } from "redux";
```

## reducer

createStore를 이용하여 store를 생성할 때 reducer라는 함수를 인자로 전달해줘야 합니다. 이 함수는 전달된 인자에 맞게(state, action) 변경된 값을 return하게 됩니다. 우리가 관리하고자 하는 data는 오직 reducer에 의해서만 변경이 이루어집니다. reducer에 전달할 인자로는 state와 action이 있습니다. state는 data를 말하고 action은 우리가 data에 어떤 작업을 할지에 대한 내용을 담고 있는 객체를 의미합니다.

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

### Provider(component)

Provider는 react에서 store를 사용할 수 있도록 redux가 제공하는 component입니다. Provider에는 store라는 property를 전달해야 합니다. 어떤 값을 전해주냐하면 우리가 생성한 store를 전달해주면 됩니다. Provider로 감싼 부분에서는 store의 데이터를 읽을 수 있게 됩니다.

```javascript
(...)
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

### connect(function)

리액트의 컴포넌트를 리덕스와 연동하려면 react-redux가 제공하는 connect함수를 사용하면 됩니다.
connect는 두개의 인자를 받고 함수를 return해주며 return한 함수는 component를 인자로 받아 redux와 연동된 component를 return해줍니다.
connect가 받는 두개의 인자는 순서대로 mapStateToProps와 mapDispatchToProps입니다. 각 인자는 아래 mapToProps에서 더욱 자세히 알아봅니다.

## mapToProps

### [mapStateToProps](https://react-redux.js.org/using-react-redux/connect-mapstate)

우선 react에서 큰 흐름 중 하나는 component에 정보를 전달하는 것이 props를 통해서 이루어지는 것이 좋다는 것입니다. 값의 변경에 따른 렌더링? 따라서 getState()를 사용해서 component에서 받아오는 것이 아니라 mapStateToProps를 정의하여 props로 전달하는 것이 가능합니다. 아래와 같이 정의 가능하며 mapStateToProps가 return 하는 값이 component의 props에 추가됩니다.

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

### mapDispatchToProps

mapDispatchToProps은 사용방법은 mapStateToProps와 비슷한데요. dispatch와 ownProps를 인자로 받는 함수로서 return하는 dispatch 함수가 component의 props에 추가됩니다.

```javascript
import {connect} from 'react-redux';
(...)

const Home = ({dispatch}) => {
    (...)
}

const mapStateToProps = () => {...}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      increase: () => dispatch(increase()),
      decrease: () => dispatch(decrease())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

## combineReducers

프로젝트 한개에서는 하나의 스토어를 생성하는게 좋습니다. (여러개의 스토어가 있을 경우 복잡성이 증가하고 관리가 힘드므로) 그런데 여러개의 reducer를 사용하고 싶다면(여러 종류의 데이터를 사용하고 싶다면) combineReducers를 이용하여 합칠 수 있습니다. 또한 combine이 이루어지는 파일의 이름은 index.js로 하면 import가 쉽습니다.

### ./src/modules/index.js

```javascript
import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";

const rootReducer = combineReducers({
  todos,
  counter,
});

export default rootReducer;
```

### ./src/index.js

```javascript
(...)
import { createStore } from "redux";
import rootReducer from "./modules";//index.js로 선언하면 폴더명까지만 명시해주어도 됩니다.

const store = createStroe(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

## bindActionCreators

액션생성함수가 많아지면 위처럼 dispatch로 감싼 것을 return하는 함수를 객체에 일일이 넣어주는게 번거로워질 수 있습니다. bindActionCreators를 사용하면 액션 생성 함수의 개수가 많아지더라도 간편하게 액션 생성 함수를 받아올 수 있습니다. 더하여 connect의 두번째 인자로 객체를 return하는 함수가 아닌 객체를 전달하게 되면 connect 함수 내부에서 bindActionCreators를 자동으로 처리해줍니다. 인자를 필요로 하는 액션 생성 함수의 경우에도 자동으로 처리해줘서 매우 편리하게 사용할 수 있습니다.

```javascript
import {connect} from 'react-redux';
import { increase, decrease } from "../modules/counter.js";

const Home = ({number, increase, decrease}) => {
    (...)
}

const mapStateToProps = (state) => {
  return {
      number: state.counter.number
   };
};

const mapDispatchToProps = {
  increase,
  decrease,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

## redux-actions

reducer함수를 작성하는게 번거롭다고 느껴지면 redux-actions 라이브러리를 사용해볼 수 있습니다.

### 설치

`$yarn add redux-actions`

### counter.js

```javascript
import { createAction, handleActions } from "redux-actions";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// createAction을 사용하면 type을 전달해주기만 하면 내부적으로 처리 후에 객체를 return해줄 겁니다.
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

//handleActions의 두번째 인자는 state 초기값을 의마합니다. 객체를 전달할 수도 있습니다.
const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  0
);
```

## middleware

미들웨어는 액션을 디스패치했을 때 리듀서에서 이를 처리하기에 앞서 사전에 지정된 작업을 실행합니다. (Express.js의 middleware와 비슷한 개념 같습니다.)

### middleware의 정의

미들웨어는 함수를 반환하는 함수를 반환하는 함수입니다. next를 실행하면 다음 미들웨어나 리듀서로 액션을 넘겨줍니다. 이런 특징으로 네트워크 요청과 같은 비동기 작업 관리에 매우 유용합니다. 또한 라이브러리 형태로 미리 잘 정의된 middleware가 많습니다. 따라서 직접 정의하지 않고 라이브러리를 이용해서 미들웨어를 활용하는 것도 좋은 방법입니다.

```javascript
const loggerMiddleware = (store) => (next) => (action) => {
  console.log(store.getState()); //이전 상태 출력
  next(action);
  console.log(store.getState()); //이후 상태 출력
};

export default loogerMiddleware;
```

### middleware 적용 방법

```javascript
(...)
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./modules";
import loggerMiddleware from "./lib/loggerMiddleware";

const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

```

### 비동기 작업을 처리하는 미들웨어 1: redux-thunk

#### 설치

`$yarn add redux-thunk`

#### project

```
project
  |--src
    |--components
      |--SampleContainer.js
      |--Sample.js
    |--lib
      |--api.js
    |--modules
      |--index.js
      |--sample.js
```

### api.js

```javascript
import axios from "axios";

export const getPost = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
```

#### modules/sample.js

비동기적인 처리를 redux-thunk에게 맡기기 위해 아래의 getPost 함수처럼 함수를 반환하는 함수를 정의해주어야합니다.

```javascript
import { handleActions } from "redux-actions";
import * as api from "../lib/api.js";

const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

export const getPost = (id) => async (dispatch) => {
  dispatch({
    type: GET_POST,
  });

  try {
    const response = await api.getPost(id);
    dispatch({
      type: GET_POST_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: e,
    });
  }
};

const sample = handleActions(
  {
    [GET_POST]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: true,
      },
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false,
      },
      post: action.payload,
    }),
    [GET_POST_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false,
      },
    }),
  },
  {
    loading: {
      GET_POST: false,
    },
    post: null,
  }
);

export default sample;
```

#### modules/index.js

```javascript
import { combineReducers } from "redux";
import sample from "./sample.js";

const rootReducer = combineReducers({
  sample,
});

export default rootReducer;
```

#### src/index.js

```javascript
(...)
import ReduxThunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(logggerMiddleware, ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

#### src/components/SampleContainer.js

```javascript
import React, {useEffect} from "react";
import {getPost} from '../modules/sample.js';

const SampleContainer = ({loadingPost, post, getPost}) => {

  useEffect(() => {
    getPost(1);
  },[getPost])

  return <div>
    <Sample loadingPost={loadingPost}, post={post} />
  </div>;
};

const mapStateToProps = ({sample}) => {
  return {
    loadingPost: sample.loading.GET_POST,
    post: sample.post
  }
}

const mapDispatchToProps = {
  getPost
}

export default connect(mapStateToProps, mapDispatchToProps)(SampleContainer);
```

#### src/components/Sample.js

```javascript
import React from "react";

const Sample = ({ loadingPost, post }) => {
  return (
    <>
      <section>
        {loadingPost && "loading..."}
        {!loadingPost && post && (
          <div>
            <h3>{post.title}</h3>
            <h3>{post.body}</h3>
          </div>
        )}
      </section>
    </>
  );
};
```

### 비동기 작업을 처리하는 미들웨어 2: redux-saga

#### 설치

`$yarn add redux-saga`
