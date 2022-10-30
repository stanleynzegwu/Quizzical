import { Grid } from 'react-loader-spinner'
import './Loading.scss'

const Loading = () => {

    const {innerWidth} = window
    let style = innerWidth >= 1000 ? 300 : 200

    return ( 
        <div className='loading'>
            <Grid
              height={style}
              width={style}
              color="#829FCE"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            <h3>Just A Moment Please</h3>
        </div>
     );
}
 
export default Loading;