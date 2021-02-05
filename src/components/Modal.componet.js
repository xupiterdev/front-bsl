import {Typography} from '@material-ui/core'
import Fade from 'react-reveal/Fade'

export function Modal({title,size, children, open}) {
    return(
        <>
            {
                open ?
                    <Fade top duration={500}>
                        <div className="modal">
                            <div className={`modal-container ${"modal-"+size}`}>
                                <div className="modal-title"><Typography variant="h6">{title}</Typography></div>
                                <div className="modal-body">{children}</div>
                            </div>
                        </div>
                    </Fade>
                : null
            }
        </>
    )
}