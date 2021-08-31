import React from 'react'
import $ from 'jquery'

export default class App extends React.Component{
    componentDidMount() {

    $('<h1 />')
    .text('Hello from jquery')
    .css({
        textAlign:'center',
        color:'#c38d3c'
    })
    .appendTo($('header'))
}

    render() {
        return(
            <React.Fragment>
                <header></header>
        
                <hr />

                <div class="box">
                    <h2 class="box-title">box title</h2>
                    
                    <p class="box-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia ea odio quam harum nobis aut dignissimos beatae ullam itaque molestiae!</p>
                </div>
             </React.Fragment>
        )
        
    }
}