import zewaLogo from '/assets/images/zewa-logo.png';
import rollBg from '/assets/images/roll-bg.png';
import * as S from './style';

export function SplashScreen() {
  return (
    <S.Wrapper>
      <S.Logo src={zewaLogo} alt="Zewa Logo" />
      <S.ProgressContainer>
        <S.ProgressBar />
      </S.ProgressContainer>
      <S.Label>Загрузка</S.Label>
      <S.BottomImage src={rollBg} alt="Background" />
    </S.Wrapper>
  );
}
