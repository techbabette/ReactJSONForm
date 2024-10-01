function PageMyFormsForm(props){
    let form = props.form;

    return (
        <div className='w-11/12 md:w-6/12 mx-auto flex flex-row flex-wrap border bg-base-200 hover:bg-primary-content rounded-lg p-2 my-4 text-center' key={form.id}>
            <div className='w-4/12 border-1 border-base-300'>
                <h1 className='h-full mk-text-center underline'>{form.name}</h1>
            </div>
            <div className='w-8/12 flex flex-col'>
                <button className=' btn border-0 my-1 rounded-sm btn-primary'>View responses ({form.number_of_responses})</button>
                <button className=' btn border-0 my-1 rounded-sm btn-secondary'>Copy link</button>
            </div>
        </div>
    )
}

export default PageMyFormsForm;