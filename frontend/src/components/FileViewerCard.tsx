import './FileViewerCard.css';

interface FileViewerCardProps {
    name: string;
}

const FileViewerCard: React.FC<FileViewerCardProps> = (props) => {
    return (
        <div className="container">
            <strong>{props.name}</strong>
            <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
        </div>
    );
};

export default FileViewerCard;
