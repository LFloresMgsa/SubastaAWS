import React, { Fragment } from 'react';
import Item from './Item';
import MenuCollapse from './MenuCollapse';



const MenuItems = (props) => {
  const { viewport, menuState } = props;

  return props.items.map(
    (item, index) =>
      !item.isDisabled && (
        <Fragment key={index}>
          {menuState.current === 'expanded' &&
            (item.level === 0 && item.tabChildren.length > 0 ? (
              <MenuCollapse viewport={viewport} {...item} />
            ) : (
              <Item viewport={viewport} {...item} />
            ))}
          {menuState.current === 'icons' && (
            <Fragment>
              {!item.tabChildren.length && <Item style="icons" {...item} />}
              {item.tabChildren.map((child, index) => (
                <Item
                  style="icons"
                  key={index}
                  viewport={viewport}
                  isChild
                  {...child}
                />
              ))}


            </Fragment>
          )}
        </Fragment>
      )
  );
};

export default MenuItems;
