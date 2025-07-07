import React from 'react';
import { Group, Div, Snackbar, Avatar } from '@vkontakte/vkui';
import { GroupStyled } from '../main-page/styles';
import { StyledSegmentedControl } from '../history/style';
import { pageTitles } from '@/mocks/page-titles';
import { options } from './mocks';
import PrizeContainer from './PrizeContainer';
import NoItems from '../no-items';
import useGlobal from '@/contexts/GlobalProvider';
import PageContainer from '../page-container';
import CouponContainer from './CouponContainer';
import { Icon16Done } from '@vkontakte/icons';
import styled from 'styled-components';

const PromoCodesPage: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState<string>(options[0].value);
    const { userData } = useAuth();
    const { audioManager } = useGlobal();
    const [snackbar, setSnackbar] = React.useState<React.ReactNode>(null);

    const showSnackbar = React.useCallback((message: string) => {
        setSnackbar(
            <Snackbar
                onClose={() => setSnackbar(null)}
                before={
                    <Avatar size={24} style={{ background: 'var(--accent)', border: "1px solid rgb(33 129 228)" }}>
                        <Icon16Done fill="rgb(33 129 228)" />
                    </Avatar>}
                duration={5000}>
                <TextMessage>{message}</TextMessage>
            </Snackbar >
        );
    }, []);
    
    const handleTabChange = React.useCallback((value: any) => {
        audioManager.playClickSound();
        setActiveTab(value);
    }, [audioManager]);

    const renderCoupons = () => {
        if (!userData) return <></>
        return (<>
            {userData?.user.activated_coupons.length > 0 && userData.user.activated_coupons.map((item, id) => (
                <CouponContainer key={id} coupon={item} activated showSnackbar={showSnackbar} />
            ))}
            {userData?.user.new_coupons.length > 0 && userData.user.new_coupons.map((item, id) => (
                <CouponContainer key={id} coupon={item} />
            ))}
            {!userData?.user.activated_coupons.length && !userData?.user.new_coupons.length && (
                <NoItems text="У вас пока нет промокодов." />
            )}
        </>)
    };

    const renderPrizes = () => (
        <>
            {userData?.user.prizes?.length ? (
                userData.user.prizes.slice().reverse().map((prize, id) => (
                    <PrizeContainer key={id} prize={prize} />
                ))
            ) : (
                <NoItems text="У вас пока нет призов." />
            )}
        </>
    );

    return (
        <PageContainer
            staticStyle={true}
            title={pageTitles.prizes}
            navigateTo='profile'>
            <Div>
                <GroupStyled >
                    <StyledSegmentedControl
                        value={activeTab}
                        onChange={(value) => handleTabChange(value)}
                        options={options}
                    />
                    <Group>
                        {activeTab === options[0].value ? renderCoupons() : renderPrizes()}
                    </Group>
                </GroupStyled>
            </Div>
            {snackbar}
        </PageContainer>
    );
};

const TextMessage = styled.span`
    color: rgb(33 129 228);
    font-family: "Foco Trial";
    font-weight: 600;
`

export default React.memo(PromoCodesPage);
