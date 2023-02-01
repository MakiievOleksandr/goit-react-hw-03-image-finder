import scss from './button.module.scss';

function Button({ onLoadMore }) {
  return (
    <button onClick={onLoadMore} className={scss.button} type="button">
      Load more
    </button>
  );
}

export default Button;
