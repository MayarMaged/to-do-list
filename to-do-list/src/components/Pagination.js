import _ from 'lodash';

function Pagination(props){
    return (
        <>
        {
        _.times(props.pagesTotal, (i) => (
            <button className={`btn ${i+1 == props.currentPage ? "active": ""}`} key={i} 
            onClick={ () => props.Paginate(i+1, props.showCompleted, props.selectedUser)}>{i + 1 }</button>
            ))
        }
        </>
    )
}
export default Pagination;
