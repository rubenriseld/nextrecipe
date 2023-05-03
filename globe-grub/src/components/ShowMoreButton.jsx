import {useState} from "react";
import {slice, concat} from 'lodash';


const length = 120;
const data = [...Array(length).keys() ];
//Find the right source
const imgsrc = "/images/globegrub2.png";
const limit = 10

export default function ShowMoreButton(){
const[showMore, setShowMore] = useState(true);
const[list,setList] = useState(slice(data, 0, limit));
const [index, setIndex] = useState(limit);

const loadMore = () => {
    const newIndex = index + limit;
    const newShowMore = newIndex < (length - 1);
    const newList = concat(list, slice(data, index, newIndex));
    setIndex(newIndex);
    setList(newList);
    setShowMore(newShowMore);
}

return (
    <div className="Showmore">
        <div className="imagesdsd">
        {list.map(()=><img src={imgsrc} alt="random"/>)}
        </div>
        {showMore && <button onClick={loadMore}> Show More </button>}
    </div>
        )
}