const GridCell = ({ row, col, children, ...rest }) => {
    const styles = {
        gridColumn: col,
        gridRow: row,
        transition: "height 2s"
    }
    return <div style={styles} {...rest}>{children}</div>;
}
export default GridCell;