import React, {useState} from 'react'

import {
    IconButton,
    ClickAwayListener
} from '@material-ui/core'

export function MenuIconButton({icon, children}){
    // FUNCTIONS
    const [isOpen, setIsOpen] = useState(false)
    
    
    // RENDER
    return(
        <ClickAwayListener
            onClickAway={() => setIsOpen(false)}
        >
            <div className="menu-list">
                <IconButton
                    variant="contained"
                    size="small"
                    className="btn-success"
                    onClick={() => setIsOpen(true)}
                >{icon}</IconButton>
                {isOpen ? <div className={`menu-options`}>{children}</div> : ""}
            </div>
        </ClickAwayListener>
    )
}
