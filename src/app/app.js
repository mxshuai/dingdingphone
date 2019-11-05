import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Refast, { LogicRender } from 'refast';
import { Component } from 'react';
import { render } from 'react-dom';
import FastClick from 'fastclick';
import reward from 'pages/reward';

import DB from 'db';
import './app.less';

const customHistory = hashHistory;



// bind fastclick
FastClick.attach(document.body);

// 这里使用 use 来配置 Refast
// Refast 文档 https://recore.github.io/refast-docs/
Refast.use('fn', {
  DB,
  history: customHistory,
});

const Loading = () => <div className="kuma-loading" />;
const Empty = () => <div>暂无数据</div>;

// 修改 LogicRender 增加默认配置
// 用来自定义Loading和Empty的样式
LogicRender.defaultProps.Empty = Empty;
LogicRender.defaultProps.Loading = Loading;

class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

render(
  <Router history={customHistory}>
    <Route name="app" path="/" component={App}>
      <IndexRoute component={reward} />
    </Route>
  </Router>,
  document.getElementById('App'),
);
