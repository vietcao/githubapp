import React from 'react';

const PaginationBar = (props) => {
    let nextPage =  props.nextPage;
    let prevPage =  props.prevPage;
    let firstPage = props.firstPage;
    let lastPage =  props.lastPage;
    let currentPage = props.page;

    if (nextPage === null && prevPage === null && firstPage === null && lastPage == null) return null;

    return (
        <div className="row justify-content-center">
            <div className="col-auto">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={firstPage !== null ? 'page-item' : 'page-item disabled'}>
                            <a className="page-link" href="#" onClick={e => props.onGoToPageClick(e, firstPage)} >First</a>
                        </li>
                        <li className={prevPage !== null ? 'page-item' : 'page-item disabled'}>
                            <a className="page-link" href="#" onClick={e => props.onGoToPageClick(e, prevPage)} >
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item active disabled">
                            <a className="page-link" href="#">{currentPage}</a>
                        </li>
                        <li className={nextPage !== null ? 'page-item' : 'page-item disabled'}>
                            <a className="page-link" href="#" onClick={e => props.onGoToPageClick(e, nextPage)}>
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                        <li className={lastPage !== null ? 'page-item' : 'page-item disabled'}>
                            <a className="page-link" href="#" onClick={e => props.onGoToPageClick(e, lastPage)}>Last</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default PaginationBar;