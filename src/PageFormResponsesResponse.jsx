function PageFormResponsesResponse(props){
    let response = props.response;

    let responseValuesHTML = [];
    for(let valueKey of Object.keys(response.values)){
        let valueOfKey = response.values[valueKey] instanceof Array ? response.values[valueKey].join(", ") : response.values[valueKey];
        responseValuesHTML.push(<p>{valueKey}: {valueOfKey}</p>)
    }
    return (
        <div className='w-11/12 md:w-6/12 mx-auto flex flex-col flex-wrap border border-4 border-secondary bg-base-200 hover:bg-primary-content rounded-lg p-2 my-4 text-left'>
            <p>Response created on {response.created_at}</p>
            <hr/>
            {responseValuesHTML}
        </div>
    )
}

export default PageFormResponsesResponse;