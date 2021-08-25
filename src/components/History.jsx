import React from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(
  class History extends React.Component {
    state = {
      askLeave: true,
      blockMove: false,
    };
    blocking = null;
    forbidMove = (newLocation, action) => {
      if (action === 'PUSH') {
        if (
          newLocation.pathname !== this.currentPathname ||
          newLocation.search !== this.currentSearch
        ) {
          this.currentPathname = newLocation.pathname;
          this.currentSearch = newLocation.search;

          this.props.history.push({
            pathname: newLocation.pathname,
            search: newLocation.search,
          });
        }
      } else {
        this.props.history.go(1);
      }
    };
    unlistener = React.createRef(null);
    onToggleAskLeave = () => {
      if (this.state.blockMove === true) {
        return;
        // this.setState({ askLeave: false });
      }
      this.setState((state) => ({ askLeave: !state.askLeave }));
    };
    onToggleBlockMove = () => {
      this.setState((state) => ({ blockMove: !state.blockMove }));
      if (!this.state.blockMove) {
        this.setState({ askLeave: false });
      }
    };
    componentDidMount() {
      this.blocking = this.props.history.block('정말 떠나실 건가요?');
      this.unlistener.current = this.props.history.listen(() => {});
    }
    componentWillUnmount() {
      if (this.blocking) {
        this.blocking();
      }
    }
    componentDidUpdate() {
      if (!this.state.askLeave) {
        this.props.history.block(null);
      } else {
        this.blocking = this.props.history.block('정말 떠나실 건가요?');
      }

      if (this.state.blockMove === true) {
        console.log('금지중');
        this.unlistener.current = this.props.history.listen(this.forbidMove);
        return;
      } else {
        console.log('허용중');
        this.unlistener.current = () => {};
        this.unlistener.current();
      }
    }

    goBack = () => {
      this.props.history.goBack();
    };
    goForward = () => {
      this.props.history.goForward();
    };
    goHome = () => {
      this.props.history.replace('/');
    };
    render() {
      console.log(this.unlistener.current);
      const { askLeave, blockMove } = this.state;
      console.log(this.props.history);
      return (
        <div>
          <button onClick={this.onToggleAskLeave}>
            {askLeave ? '떠나기 전에 묻는 중' : '떠나기 전에 안 묻는 중'}
          </button>
          <button onClick={this.onToggleBlockMove}>
            {blockMove ? '뒤로가기 금지 중' : '뒤로가기 가능'}
          </button>
          <button onClick={this.goBack}>뒤로</button>
          <button onClick={this.goForward}>앞으로</button>
          <button onClick={this.goHome}>홈으로</button>
        </div>
      );
    }
  },
);
