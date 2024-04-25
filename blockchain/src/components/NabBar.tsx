import {Container, Button} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Link from 'next/link'

const NabBar = () => {
  return (
    <div className="nav-bar">
      <Container maxWidth="xl" className="relative-area">
        <div className="back-area">
          <a href={`${process.env.NEXT_NEXT_PUBLIC_FRONTEND_URL}`}>
            <Button size={"large"}>
              <ArrowBackIosIcon sx={{color: "#15c2bd"}}/>
              Back
            </Button>
          </a>
        </div>
        <Link href="/">
          <img src="/images/logo.svg" alt=""/>
        </Link>
        <div className="links-area">
          <Link href="/medical-records">
            <Button size={"large"} variant={"outlined"}>
              Check medical records
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  )
}

export default NabBar;
