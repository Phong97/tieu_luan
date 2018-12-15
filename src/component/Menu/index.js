import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './style.scss';

// list of items
const list = [
  { name: 'INFORMATON', id : 1 },
  { name: 'ART', id : 2 },
  { name: 'TECH', id : 3 },
];

// One item component
// selected prop will be passed
const MenuItem = ({ text, key, id }) => {
  const url = "/catogory/" + id;
  return (
    <div
      className="menu-item"
    >
      <a href={url}>{text}</a>
    </div>
  );
};

// All items component
// Important! add unique key
const MenuItems = (list) => list.map(el => {
  const { name, id } = el;
  return (
    <MenuItem
      text={name}
      key={id}
      id={id}
    />
  );
});


const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};


const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

class Menu extends React.Component {
  state = {
    selected: 0
  };

  onSelect = key => {
    this.setState({ selected: key });
  }

  render() {
    const { selected } = this.state;
    const menu = MenuItems(list, selected);

    return (
      <div className="MenuHomePage container">
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

export default Menu;
