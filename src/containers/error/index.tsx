// ** MUI Components
import Box, { BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width:'100%',
  [theme.breakpoints.down("md")]: {
    width: "90vw",
  },
}));

const Img = styled("img")(({ theme }) => ({
  marginTop: theme.spacing(15),
  marginBottom: theme.spacing(15),
  [theme.breakpoints.down("lg")]: {
    height: 450,
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
  },
  [theme.breakpoints.down("md")]: {
    height: 400,
  },
}));

const ButtonBackStyled = styled(Button)(({ theme }) => ({
  display: "flex",
  padding: "6px 16px",
  backgroundColor: "#FFC20E",
  color: "#454F5B",
  textAlign: "center",
  fontFamily: "Be VietNam Pro, sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "24px",
  letterSpacing: "0.4px",
  textTransform: "uppercase",
  "&:hover": {
    backgroundColor: "#FFC20E",
    color: "#454F5B",
  },
}));

const BASE_URL = process.env.REACT_APP_HDBANK ?? "";

export default function Custom404({
  message = "Page Not Found",
  statusCode = "404",
}: {
  message?: string;
  statusCode?: string;
}) {
  const handleBack = () => {
    window.location.assign(BASE_URL);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        height: "100vh"
      }}
    >
      <Box className="content-center">
        <Box
          sx={{
            p: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap:"24px"
          }}
        >
          <BoxWrapper>
            <Typography variant="h1"
            style={{
              fontSize: "128px",
            }}
            sx={{ 
             fontWeight: 800,
             letterSpacing: ".105em",
             lineHeight: "194px",
             transform: "matrix(1,0,.03,1,0,0)",
              backgroundClip: "text",
              backgroundImage:
                "linear-gradient(180deg,#ffd149,#e0242c 50%,#cb0817) !important",
              color: "transparent",
            }}>
              {statusCode}
            </Typography>
            <Typography
              variant="h5"
              style={{
                fontSize: "48px",
              }}
              sx={{
                fontWeight: 700,
                lineHeight: "70px",
                textAlign: "center",
                textTransform: "uppercase",
                backgroundClip: "text",
                backgroundImage:
                  "linear-gradient(180deg,#ffd149,#e0242c 50%,#cb0817) !important",
                color: "transparent",
              }}
            >
              {message}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#6f7279",
                fontSize: "24px",
                fontWeight: 500,
                lineHeight: "35px",
                textAlign: "center",
              }}
            >
              Rất tiếc, chúng tôi không thể tìm thấy trang mà bạn yêu cầu. Có
              thể bạn sẽ tìm thấy những thông tin hữu ích khác tại trang chủ
              HDBank.
            </Typography>
          </BoxWrapper>

          <ButtonBackStyled onClick={handleBack} sx={{ px: 5.5 }}>
            Back to Home
          </ButtonBackStyled>
        </Box>
      </Box>
    </Box>
  );
}
