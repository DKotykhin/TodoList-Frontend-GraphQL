import React from 'react';

import { Box } from "@mui/material";
import CardList from 'components/cardList/CardList';

import PropTypes from "prop-types";

interface ITabList {
    tabIndex: number;
    searchQuery: string;
    fieldValue: string;
    AZValue: number;
}
interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <Box>{children}</Box>
                </Box>
            )}
        </Box>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const TabList: React.FC<ITabList> = ({ tabIndex, searchQuery, fieldValue, AZValue }) => {
    return (
        <>
            <TabPanel value={tabIndex} index={0}>
                <CardList
                    tabIndex={tabIndex}
                    searchQuery={searchQuery}
                    fieldValue={fieldValue}
                    AZValue={AZValue}
                />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <CardList
                    tabIndex={tabIndex}
                    searchQuery={searchQuery}
                    fieldValue={fieldValue}
                    AZValue={AZValue}
                />
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
                <CardList
                    tabIndex={tabIndex}
                    searchQuery={searchQuery}
                    fieldValue={fieldValue}
                    AZValue={AZValue}
                />
            </TabPanel>
        </>
    )
}

export default TabList;