---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

When using `Carousel` in web projects, you may have problem about how to deal with variable item height.

> [issues/1002](https://github.com/ant-design/ant-design-mobile/issues/1002#issuecomment-287301262)、[nuka-carousel/issues/103](https://github.com/FormidableLabs/nuka-carousel/issues/103)

````jsx
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';

class App extends React.Component {
  state = {
    data: ['', '', ''],
    imgHeight: 176,
  }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }
  render() {
    return (
      <WingBlank>
        <div className="sub-title">Normal</div>
        <Carousel
          autoplay={false}
          infinite
          selectedIndex={1}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.data.map(ii => (
            <a
              key={ii}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${ii}.png`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>

        <WhiteSpace />
        <div className="sub-title">Vertical</div>
        <Carousel className="my-carousel"
          vertical
          dots={false}
          dragging={false}
          swiping={false}
          autoplay
          infinite
        >
          <div className="v-item">carousel 1</div>
          <div className="v-item">carousel 2</div>
          <div className="v-item">carousel 3</div>
        </Carousel>

        <WhiteSpace />
        <div className="sub-title">Lottery</div>
        <Carousel className="my-carousel"
          vertical
          dots={false}
          dragging={false}
          swiping={false}
          autoplay
          infinite
          speed={200}
          autoplayInterval={300}
          resetAutoplay={false}
        >
          {['ring', 'ruby', 'iPhone', 'iPod', 'sorry', 'tourism', 'coke', 'ticket', 'note'].map(type => (
            <div className="v-item" key={type}>{type}</div>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
````css
.my-carousel .v-item {
  height: 36px;
  line-height: 36px;
  padding-left: 10px;
}
.sub-title {
  color: #888;
  font-size: 14px;
  padding: 30px 0 18px 0;
}
````
