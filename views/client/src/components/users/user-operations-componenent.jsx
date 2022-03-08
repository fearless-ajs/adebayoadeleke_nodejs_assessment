import React from "react";

const UserOperationsComponent = () => {


    return  (
        <div className="tab-pane fade" id="operations" role="tabpanel" aria-labelledby="operations-tab">
            <div className="card">
                <div className="card-body">
                    <h6 className="card-title mb-4">Notifications</h6>
                    <h6 className="mb-4">Activity Notifications</h6>
                    <div className="mb-5">
                        <div className="mb-3">
                            <div className="form-check form-switch">
                                <input type="checkbox" className="form-check-input" checked id="cs1" />
                                <label className="form-check-label" htmlFor="cs1">Someone assigns me
                                    to a task</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-check form-switch">
                                <input type="checkbox" className="form-check-input" checked id="cs2" />
                                <label className="form-check-label" htmlFor="cs2">Someone mentions
                                    me in a
                                    conversation</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-check form-switch">
                                <input type="checkbox" className="form-check-input" checked id="cs3" />
                                <label className="form-check-label" htmlFor="cs3">Someone adds me to
                                    a project</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-check form-switch">
                                <input type="checkbox" className="form-check-input" id="cs4" />
                                <label className="form-check-label" htmlFor="cs4">Activity on a
                                    project I am a member
                                    of</label>
                            </div>
                        </div>
                    </div>
                    <h6 className="mb-4">Service Notifications</h6>
                    <div>
                        <div className="mb-3">
                            <div className="form-check form-switch">
                                <input type="checkbox" className="form-check-input" id="cs5" />
                                <label className="form-check-label" htmlFor="cs5">Monthly
                                    newsletter</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-check form-switch">
                                <input type="checkbox" className="form-check-input" checked id="cs6" />
                                <label className="form-check-label" htmlFor="cs6">Major feature
                                    enhancements</label>
                            </div>
                        </div>
                        <div>
                            <div className="form-check form-switch">
                                <input type="checkbox" className="form-check-input" id="cs7" />
                                <label className="form-check-label" htmlFor="cs7">Minor updates and
                                    bug fixes</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserOperationsComponent;