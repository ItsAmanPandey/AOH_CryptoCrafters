import './Page.css'

import HorizontalAd from '../Components/Embedding/HorizontalAd'
import VerticalAd from '../Components/Embedding/VerticalAd'
import SquareAd from '../Components/Embedding/SquareAd'

import HorizontalAdImg from '../Components/Embedding/AdHorizontal.jpeg';
import VerticalAdImg from '../Components/Embedding/AdVertical.jpeg';
import SquareAdImg from '../Components/Embedding/AdSquare.jpeg';

 
 
const ConnectedPage = () => (
    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <HorizontalAd imageSrc={HorizontalAdImg} />
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
            <VerticalAd imageSrc={VerticalAdImg} />
            <div className='connectedPage'>
                <h1>Main Website Content Here</h1>
            </div>
            <div className='squareAdContainer'>
                <SquareAd imageSrc={SquareAdImg} />
                <SquareAd imageSrc={SquareAdImg} />
            </div>
        </div>
        <HorizontalAd imageSrc={HorizontalAdImg} />
    </div>
);


export default ConnectedPage;
