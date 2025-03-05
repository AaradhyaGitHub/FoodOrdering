export default function Error({ title, message }) {
    return (
        <div className="error">
            <h2>{title?.toString()}</h2>
            <p>{message?.toString()}</p>
        </div>
    );
}
