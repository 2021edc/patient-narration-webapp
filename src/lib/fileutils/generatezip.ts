import JSZip from 'jszip';
import FileSaver from 'file-saver';
import { toast } from 'sonner';

const generateNarrationZip = (
  selectedNarration: string | undefined,
  selectedPatients: string[]
) => {
  const zip = new JSZip();
  const folder = zip.folder('patients');
  if (folder) {
    selectedPatients.forEach((patientId) => {
      folder.file(`${selectedNarration}_patients.txt`, patientId);
    });
    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, 'patients.zip');
    });
  } else {
    toast.error('Failed to create zip folder.');
  }
};

export default generateNarrationZip;
