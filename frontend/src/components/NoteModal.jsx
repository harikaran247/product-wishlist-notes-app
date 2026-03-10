import { useState, useEffect } from 'react';
import { X, Plus, Edit, Trash2, Save, StickyNote } from 'lucide-react';
import { notesAPI } from '../services/api';

const NoteModal = ({ isOpen, onClose, product }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);

  useEffect(() => {
    if (isOpen && product) {
      fetchNotes();
    }
  }, [isOpen, product]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await notesAPI.getAll(product._id);
      setNotes(response.data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    try {
      const response = await notesAPI.create(product._id, newNote);
      setNotes([response.data, ...notes]);
      setNewNote({ title: '', content: '' });
      setShowNewNoteForm(false);
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const handleUpdateNote = async (noteId, updatedData) => {
    try {
      const response = await notesAPI.update(noteId, updatedData);
      setNotes(notes.map(note => 
        note._id === noteId ? response.data : note
      ));
      setEditingNote(null);
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notesAPI.delete(noteId);
        setNotes(notes.filter(note => note._id !== noteId));
      } catch (error) {
        console.error('Failed to delete note:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Notes for {product?.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Add New Note Button */}
          {!showNewNoteForm && (
            <button
              onClick={() => setShowNewNoteForm(true)}
              className="w-full mb-6 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add New Note</span>
            </button>
          )}

          {/* New Note Form */}
          {showNewNoteForm && (
            <form onSubmit={handleCreateNote} className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Note title..."
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="input-field"
                  required
                />
                <textarea
                  placeholder="Note content..."
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  className="input-field h-24 resize-none"
                  required
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="btn-primary flex items-center space-x-1"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Note</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewNoteForm(false);
                      setNewNote({ title: '', content: '' });
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Notes List */}
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <StickyNote className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No notes yet. Add your first note above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notes.map((note) => (
                <NoteItem
                  key={note._id}
                  note={note}
                  isEditing={editingNote === note._id}
                  onEdit={() => setEditingNote(note._id)}
                  onSave={(updatedData) => handleUpdateNote(note._id, updatedData)}
                  onCancel={() => setEditingNote(null)}
                  onDelete={() => handleDeleteNote(note._id)}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NoteItem = ({ note, isEditing, onEdit, onSave, onCancel, onDelete, formatDate }) => {
  const [editData, setEditData] = useState({ title: note.title, content: note.content });

  const handleSave = (e) => {
    e.preventDefault();
    if (!editData.title.trim() || !editData.content.trim()) return;
    onSave(editData);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSave} className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="space-y-3">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="input-field"
            required
          />
          <textarea
            value={editData.content}
            onChange={(e) => setEditData({ ...editData, content: e.target.value })}
            className="input-field h-24 resize-none"
            required
          />
          <div className="flex space-x-2">
            <button type="submit" className="btn-primary flex items-center space-x-1">
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 dark:text-white">{note.title}</h4>
        <div className="flex space-x-1">
          <button
            onClick={onEdit}
            className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 whitespace-pre-wrap">
        {note.content}
      </p>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Created: {formatDate(note.createdAt)}
        {note.updatedAt !== note.createdAt && (
          <span className="ml-2">• Updated: {formatDate(note.updatedAt)}</span>
        )}
      </div>
    </div>
  );
};

export default NoteModal;