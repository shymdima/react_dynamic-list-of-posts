import React from "react"
import { Comment } from "../types/Comment"
import { client } from "../utils/fetchClient"

type Props = {
    comment: Comment
    setCommentsFromServer: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export const CommentListElement: React.FC <Props>= ({comment, setCommentsFromServer}) => {
  const onDelete = () => {
    console.log('Deleting comment:', comment.id);
    client.delete(`/comments/${comment.id}`)
      .then(() => {
        setCommentsFromServer(prev => {
          const updatedComments = [...prev.filter(commentInList => commentInList.id !== comment.id)];
          console.log('Updated comments:', updatedComments);
          return updatedComments;
        });
      })
      .catch(() => {
        alert('Failed to delete the comment.');
      });
  };

    return(<article className="message is-small" data-cy="Comment">
        <div className="message-header">
          <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
            {comment.name}
          </a>

          <button
            data-cy="CommentDelete"
            type="button"
            className="delete is-small"
            aria-label="delete"
            onClick={onDelete}
          >
            delete button
          </button>
        </div>

        <div className="message-body" data-cy="CommentBody">
          {comment.body}
        </div>
      </article>)
}