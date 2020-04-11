import React from 'react'
import Symbol from './MathSymbols'
import Paper from '@material-ui/core/Paper'

export default () => {
    
    const numbers = []
    for(let i=1;i<10;i++) {
        numbers.push(<Symbol key={i}>{i}</Symbol>)
    }

    return (
        <Paper className='Calulator'>
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
        </Paper>
    )
}