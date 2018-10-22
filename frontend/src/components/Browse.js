import React from 'react'
import ReactDOM from 'react-dom';
import ReactSwipe from 'react-swipe';

class Carousel extends React.Component {
    render() {
        return (
            <ReactSwipe className="carousel" swipeOptions={{continuous: false}}>
                <div>PANE 1</div>
                <div>PANE 2</div>
                <div>PANE 3</div>
            </ReactSwipe>
        );
    }
}

ReactDOM.render(
    <Carousel />,
    document.getElementById('app')
);
