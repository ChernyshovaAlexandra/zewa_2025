import { UserIcon, ZewaButton } from '@/shared/ui';
import { HomeWrapper, Navigation } from './HomeScreen.styles';
import { Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../splash/style';
import zewaLogo from '/assets/images/zewa-logo.png';
import magnitLogo from '/assets/images/logo-magnit.png';

export function HomeScreenClosed() {
  const navigate = useNavigate();

  return (
    <HomeWrapper $withImage>
      <Navigation>
        <Flex justify="flex-end">
          <ZewaButton variant="white" onClick={() => navigate('/profile')}>
            <UserIcon />
          </ZewaButton>
        </Flex>
      </Navigation>
      <Flex justify="center" gap="1rem">
        <Logo style={{ width: '68px' }} src={zewaLogo} alt="Zewa Logo" />
        <Logo style={{ width: '107px', height: '47px' }} src={magnitLogo} alt="Magnit Logo" />
      </Flex>
      <Flex style={{ flex: 1, paddingBottom: '4rem' }}>
        <h1
          style={{
            color: '#fff',
            fontFamily: 'Foco Trial',
            fontWeight: 700,
            fontSize: '28px',
            lineHeight: 1,
            textAlign: 'center',
            whiteSpace: 'pre-wrap',
          }}
        >{`Ждите следующих\nобновлений!\nДо скорой встречи!`}</h1>
      </Flex>
      <ZewaButton
    //   finl
        variant="white"
        onClick={() => {
          window.open('https://t.me/zemma_zewa_support', '_blank');
        }}
      >
        Связаться с поддержкой
      </ZewaButton>
    </HomeWrapper>
  );
}
