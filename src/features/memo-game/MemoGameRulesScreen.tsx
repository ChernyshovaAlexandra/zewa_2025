import { useNavigate } from 'react-router-dom';
import { PageContainer, Text } from '@/shared/ui';
import { applyNbsp } from '@/utils';
import styled from 'styled-components';

const MEMO_RULES_TEXT = `
<p>Помогите Домовёнку навести порядок и нарядить ёлку!</p>
<p>&laquo;Не проЗЕВАй праздник!&raquo; — вариация на тему классической игры &laquo;Мемори&raquo;.</p>
<p>Карточки с новогодними игрушками и товарами Zewa лежат рубашкой вверх. Переворачивайте их попарно, нажимая на карту пальцем или курсором мыши. Если изображения совпадут, карточки останутся открытыми. Если пара не найдена, картинки вернутся на место. Ваша задача — открыть все пары одинаковых карточек за отведённое время.</p>
<ul>
  <li>В игре 3 уровня сложности.</li>
  <li><b>1-й уровень.</b> Не требует покупки Zewa и регистрации чека. Найдите 6 пар картинок за 30 секунд и получите за это 6 снежинок.</li>
  <li><b>2-й уровень.</b> Открывается при заполнении шкалы призов на 25 %. Найдите 10 пар картинок за минуту и получите за это 10 снежинок.</li>
  <li><b>3-й уровень.</b> Доступен при заполнении шкалы призов на 75 %. Найдите 15 пар картинок за 2 минуты и получите за это 15 снежинок.</li>
</ul>
<ul>
  <li>Количество попыток не ограничено, но снежинки начисляются только за первое успешное прохождение уровня.</li>
  <li>Играйте каждый день, чтобы автоматически попасть в Клуб помощников Домовёнка.</li>
  <li>Каждую неделю прогресс обнуляется: снова проходите 3 уровня, зарабатывайте снежинки и участвуйте в розыгрышах ценных призов.</li>
</ul>
`;

export function MemoGameRulesScreen() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/game/memo', { replace: true, state: { openMemoPause: true } });
  };

  return (
    <PageContainer
      fullscreen
      withPadding={false}
      title="Правила игры"
      scrollable={true}
      onBack={handleBack}
    >
      <Content>
        <RulesText
          as="div"
          size="p4"
          dangerouslySetInnerHTML={{ __html: applyNbsp(MEMO_RULES_TEXT) }}
        />
      </Content>
    </PageContainer>
  );
}

const Content = styled.div`
  padding: 0 10px 60px;
`;

const RulesText = styled(Text)`
  color: #fff;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: 'Foco Trial';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  white-space: normal;

  ol,
  ul {
    margin: 18px 0;
    padding-left: 28px;
  }

  li {
    padding-left: 4px;
  }

  li + li {
    margin-top: 14px;
  }

  p {
    margin: 12px 0;
  }
`;
