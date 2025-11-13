import zewaLogo from '/assets/images/zewa-logo-big.webp';
import rollBg from '/assets/images/christmas.webp';
import { useImagePreloader } from '@/hooks';
import { imageManifest } from '@/shared/assets/imageManifest';
import * as S from './style';

export function SplashScreen() {
  useImagePreloader(imageManifest);

  return (
    <S.Wrapper>
      <S.Logo src={zewaLogo} alt="Zewa Logo" />
      <S.ProgressContainer>
        <S.ProgressBar />
      </S.ProgressContainer>
      <S.Label>Загрузка</S.Label>
      <S.BottomImage src={rollBg} alt="Background" width={780} height={1510} decoding="async" />
    </S.Wrapper>
  );
}
