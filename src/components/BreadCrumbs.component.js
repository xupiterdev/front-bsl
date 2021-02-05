import React from 'react'

import {
    Typography,
    Breadcrumbs,
    Divider
} from "@material-ui/core"

export function BreadCrumbs({title, children}){
    // FUNCTIONS

    // RENDER
    return(
        <React.Fragment>
             <div className="row mb-05">
                <div className="col-md-6"><Typography variant="h5">{title}</Typography></div>
                <div className="col-md-6 row justify-content-end align-self-end">
                    <Breadcrumbs className="">{children}</Breadcrumbs>
                </div>
            </div>
            <Divider className="mb-1"/>
        </React.Fragment>
    )
}
