import React from 'react';
import styled from 'styled-components';

// --> Styled Components  start <--
/* A styled component to style stats*/
const Wrapper = styled.div`
    display: flex;
    align-self: center;
    justify-content: center;

    flex-direction: ${props => props.dir?props.dir:'row'};
    padding: 16px 0;
    @media (max-width: 800px){
        flex-direction: column;
    }

    /* keeps label and value in the same line*/
    .horizontal-wrapper{
        display: flex;
        align-self: center;
        justify-content: center;

        padding: 6px 30px;
    }

    /* seperates labels and values */
    .vertical-wrapper {
        display: flex;
        flex-direction: column;

        align-items: center;
        justify-content: center;

        text-align: center;
        padding: 6px 12px;
    }

    /* styles the value, a class count should be given to the value*/
    .count {
        font-family: 'Lilita One';
        font-size: 18px;
        margin: 0;

        @media (max-width: 600px){
            font-size: 16px;
        }
    }

    /* styles the label, a class type should be given to the label*/
    .type {
        font-family: 'Montserrat';
        font-size: 16px;
        font-weight: lighter;
        padding: 0 6px 0 0;
        margin: 0;

        @media (max-width: 600px){
            font-size: 14px;
        }
    }
`;
// --> Styled Components end <--

// --> React functional component starts <--
const StatsText = (props) => {
    //extracting data from props
    const data = props.data;
    // labels for type of data
    const labels = props.labels;
    // which data should be displayed
    const display = props.display;
    return (
        <Wrapper dir={props.dir}>
            {display.map((elt,i) => { 
                    return (
                        <div className={props.divClass} key={i}>
                            <h1 className='type'>{`${labels[elt].label}:  `}</h1>
                            <h1 className='count'>{data[elt]}</h1>
                        </div>
                    )  
                }  
            )}
        </Wrapper>
    );
}
// --> React functional components ends <--

export default StatsText;