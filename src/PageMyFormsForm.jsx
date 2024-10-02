import { Link } from "react-router-dom";
import { toast } from "react-toastify";
function PageMyFormsForm(props){
    let form = props.form;

    function copyFormLocationToClipboard(){
        navigator.clipboard.writeText(`${window.location.host}/form/${form.id}`).then(() => {
            toast.success("Successfully copied link to clipboard");
        })
    }

    return (
        <div className='w-11/12 md:w-6/12 mx-auto flex flex-row flex-wrap border border-4 border-secondary bg-base-200 hover:bg-primary-content rounded-lg p-2 my-4 text-center' key={form.id}>
            <div className='w-4/12 border-1 border-base-300'>
            <Link to={`/form/${form.id}`} className="h-full mk-text-center underline" title={`${form.name}, created on ${form.created_at}`}>{form.name}</Link>
            </div>
            <div className='w-8/12 flex flex-col'>
                <Link to={`/forms/${form.id}/responses`} className=' btn border-0 my-1 rounded-sm btn-primary'>View responses ({form.number_of_responses})</Link>
                <button onClick={copyFormLocationToClipboard} className=' btn border-0 my-1 rounded-sm btn-secondary  '>Copy link</button>
            </div>
        </div>
    )
}

export default PageMyFormsForm;