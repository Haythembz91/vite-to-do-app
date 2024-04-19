import styled from 'styled-components'



const OuterBar = styled.div`
    height:14px;
    width:70%;
    background-color:rgb(216,216,216);
    border-radius:7px;
    overflow:hidden;
    margin: 0 10px;
    
    
`
const InnerBar = styled.div`
    height:14px;

`
const Bar = styled.h1`
color:red;
`



const ProgressBar=({progress})=>{
    const colors = [
        'rgb(255,214,161)',
        'rgb(255,175,163)',
        'rgb(108,115,148)',
        'rgb(141,181,145)'
    ]

    const random = colors[Math.floor(Math.random()*colors.length)]

    return(
        <OuterBar>
            <InnerBar style={{width:progress+'%',backgroundColor:random}}></InnerBar>
        </OuterBar>
    )
}

export default ProgressBar