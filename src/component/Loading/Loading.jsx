import { Grid } from 'react-loader-spinner'
import './Loading.scss'

const Loading = ({ error }) => {

    const {innerWidth} = window
    let style = innerWidth >= 1000 ? 300 : 200

    return ( 
      error ? 
        <div className='error'>
          <p className='error__p1'>OOPS...</p>
          <p className='error__p2'>An error occured try again.</p>
        </div>
      :
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