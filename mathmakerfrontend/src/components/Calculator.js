import React from 'react'
import Symbol from './MathSymbols'
import '../stylesheets/Calculator.scss'

export default () => {
    
    const numbers = []
    for(let i=1;i<10;i++) {
        numbers.push(<Symbol key={i}>{i}</Symbol>)
    }

    return (
        <div className='calculator'>
            <div className='numbers'>
                {numbers}
                <Symbol id='zero'>0</Symbol>
            </div>

            <div className='symbols'>
                <Symbol> . </Symbol>
                <Symbol> + </Symbol>
                <Symbol> - </Symbol>
                <Symbol> × </Symbol>
                <Symbol> ÷ </Symbol>
                <Symbol> / </Symbol>
                <Symbol> = </Symbol>
            </div>
        </div>
    )
}