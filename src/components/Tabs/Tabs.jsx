import { useSelector, useDispatch } from 'react-redux';
import { setActiveIndex } from '../../feature/activeindex/activeindex-slice';
import './Tabs.css'

function Tabs(tabData){
    const activeIndex = useSelector((state) => state.activeindex.value);

    const dispatch = useDispatch();

    return(
        <div className='TabView'>
            <div className='body'>
            {Object.keys(tabData).length === 0 ? (
                        <div>No Tabs</div>
                    ) : ( 
                        <div>
                            <div className='tabs'>
                                {tabData.tabs.map((tab,index) => (
                                    <label 
                                        key={index}
                                        className={index === activeIndex ? 
                                            "active-tab" : "tab"}
                                        onClick={()=>dispatch(setActiveIndex(index))}
                                    >
                                        {tab.name}
                                    </label>
                                ))}
                            </div>
                            <div className='content'>{tabData.tabs[activeIndex].content}</div>         
                        </div>
                    )}
                </div>
            </div>
    )
}

export default Tabs;