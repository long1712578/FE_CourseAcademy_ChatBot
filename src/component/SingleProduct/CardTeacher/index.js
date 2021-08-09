import React from "react";

const CardTeacher=({teacher})=>{
    return( <article className="card mt-5">
        <div className="card-body">
            <div className="row">
                <aside className="col-md-6">
                    <h5>Teacher</h5>
                    <dl className="row">
                        <dt className="col-sm-3">Name</dt>
                        <dd className="col-sm-9">{teacher.fullname}</dd>

                        <dt className="col-sm-3">Email</dt>
                        <dd className="col-sm-9">{teacher.email}</dd>

                        <dt className="col-sm-3">Phone number</dt>
                        <dd className="col-sm-9">{teacher.phone}</dd>

                        <dt className="col-sm-3">Address</dt>
                        <dd className="col-sm-9">{teacher.address}</dd>

                        <dt className="col-sm-3">Gender</dt>
                        {
                            teacher.gender===1&&
                            <dd className="col-sm-9">Man
                            </dd>
                        }
                        {
                            teacher.gender===0&&
                            <dd className="col-sm-9">Woman
                            </dd>
                        }

                    </dl>
                </aside>
                <aside className="col-md-6">
                    <h5>Features</h5>
                    <ul className="list-check">
                        <li>Easy to learn</li>
                        <li>Highly-professional trained</li>
                        <li>Create employment conditions after completion</li>
                        <li>Best performance of courses</li>
                        <li>Job support</li>
                    </ul>
                </aside>
            </div>
            <hr/>
            <p>
                This is a teacher with extensive experience in the field of programming, invited from prestigious universities. Teachers are always dedicated and try to help and teach their students.
            </p>
        </div>
    </article>
    )
}
export default CardTeacher;