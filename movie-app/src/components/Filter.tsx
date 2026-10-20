type FilterProps = {
  titleFilter: string;
  ratingFilter: number;
  onTitleChange: (value: string) => void;
  onRatingChange: (value: number) => void;
};

function Filter({
  titleFilter,
  ratingFilter,
  onTitleChange,
  onRatingChange,
}: FilterProps) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search by movie title..."
        value={titleFilter}
        onChange={(event) => onTitleChange(event.target.value)}
      />

      <label>
        Minimum rating
        <select
          value={ratingFilter}
          onChange={(event) => onRatingChange(Number(event.target.value))}
        >
          <option value={0}>All ratings</option>
          <option value={5}>5 and above</option>
          <option value={6}>6 and above</option>
          <option value={7}>7 and above</option>
          <option value={8}>8 and above</option>
          <option value={9}>9 and above</option>
        </select>
      </label>
    </div>
  );
}

export default Filter;
