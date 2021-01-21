import React from 'react'

const Loading = () => {
    return(
        <div className="loading-div">
            <h1 className="logo"><span>Ok</span>Friend</h1>
            <h2>Loading</h2>
            <div id="loading-symbol">
                <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    )
}

export default Loading;