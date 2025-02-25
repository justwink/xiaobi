import React, { useState, useEffect, useCallback } from 'react';
import { CMDS } from '@Const/commands';
import styled from 'styled-components';
import { TabItem, SortData } from '@InterFace/index';
import { StaticRoutes } from '@Const/routes';
import useMessage from '@Src/hooks/useMessage';
import useSocket from '@Hooks/useSocket';
import { WS_TICKET } from '@Const/ws';

import TipButton from '@Src/components/tipButton';
import Banner from '@Src/components/home/banner';
import Tabs from '@Src/components/home/tabs';
import Table from '@Components/home/table';
import message from '@Components/message';

interface Props {
	history: any;
}

const WrapperUI = styled.div`
	height: 500px;
	overflow: hidden;
	background-color: ${(p) => p.theme.bg};
`;

const MenuUI = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: ${(p) => p.theme.panelBg};
	border-bottom: 1px solid ${(p) => p.theme.tdBorder};
	border-radius: 6px 6px 0 0;
`;

const BtnGroupUI = styled.div`
	padding-right: 8px;
	display: flex;
	align-items: center;
	gap: 2px;
`;

const tabList: TabItem[] = [
	{ command: CMDS.CMD_SELFCOIN, name: '自选', active: false },
	{ command: CMDS.CMD_INCREASELIST, name: '涨幅榜', active: true },
	{ command: CMDS.CMD_HOTLIST, name: '热搜榜', active: false },
	{ command: CMDS.CMD_FOLLOWLIST, name: '关注榜', active: false },
];

const Home: React.FC<Props> = ({ history }) => {
	const [isVisible, setVisible] = useState(false); //	切换快捷入口
	const [tabData, setTabData] = useState(tabList);
	const [tabIndex, setTabIndex] = useState(1);
	const [sort, setSort] = useState<SortData>({ field: 'currency', sort: 0 }); //	列表排序
	const { data: request } = useMessage({ command: tabList[tabIndex].command, data: sort });
	const [tableData, setTableData] = useState<any>(request);
	const { wsData } = useSocket({ url: WS_TICKET, data: request });

	const handleClick = useCallback(
		(idx: number) => {
			const temp = tabData.map((v, i) => ({ ...v, active: false }));
			temp[idx].active = true;

			setTabData(temp);
			setTabIndex(idx);
			setVisible(false);
		},
		[tabIndex],
	);

	const goSearch = () => history.push(StaticRoutes.Search);
	// coin 详情页
	const goDetail = (id: string | number) => {
		// 传入 request + id
		history.push({ pathname: StaticRoutes.Trend, state: { list: request, id } });
	};
	const toggleNotify = () => {
		!isVisible && message.info('鼠标悬浮列表，可触发快捷入口');
		setVisible(!isVisible);
	};

	useEffect(() => {
		setTableData(null);
	}, [tabIndex]);

	useEffect(() => {
		if (request) {
			if (!wsData) {
				setTableData(request);
			} else if (!request.code) {
				const combine = request.map((v: any) => {
					if (v.id === (wsData as any).id) {
						return { ...v, ...wsData };
					}
					return { ...v };
				});
				setTableData(combine);
			} else {
				setTableData(request);
			}
		}
	}, [request, wsData]);

	return (
		<WrapperUI>
			<Banner />
			<MenuUI>
				<Tabs data={tabData} idx={tabIndex} clickEvent={handleClick} />
				<BtnGroupUI>
					{/* <TipButton placement='top' icon='iconpaixu'>
						排序
					</TipButton> */}
					<TipButton placement='top' icon='iconfeijifasong' hold onClick={toggleNotify}>
						快捷模式
					</TipButton>
					<TipButton placement='top' icon='iconsousuo' onClick={goSearch}>
						搜索
					</TipButton>
				</BtnGroupUI>
			</MenuUI>
			<Table data={tableData} clickEvent={setSort} itemClick={goDetail} shortcut={isVisible} />
		</WrapperUI>
	);
};

export default Home;
