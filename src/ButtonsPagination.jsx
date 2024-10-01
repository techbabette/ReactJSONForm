function ButtonsPagination(props){
    let page = props.page;
    let lastPage = props.lastPage;
    let setPage = props.setPage;
    
    function changePage(direction){
        setPage(page + direction);
    }

    return (
    <>    
    {(lastPage > 1) && 
    <div className='w-full mx-auto flex flex-row items-center justify-between'>
        <button disabled={page === 1} onClick={() => changePage(-1)} className="btn btn-neutral disabled:btn-disabled">&lt;</button>
        <p>Page {page} of {lastPage}</p>
        <button disabled={page >= lastPage} onClick={() => changePage(1)} className="btn btn-neutral disabled:btn-disabled">&gt;</button>
      </div>
    }
    </>
    )
}

export default ButtonsPagination;