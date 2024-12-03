import {
  useForm,
  FormProvider,
  useFormContext,
  useFieldArray,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MateriaSemestre } from "@/types/malla";
import { Materia, materiaSchema } from "@/types/materia";
import Combobox from "@/components/combobox";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";

export interface MateriaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  availableMaterias: Materia[];
  semestreIndex: number;
}

const MateriaDialog: React.FC<MateriaDialogProps> = ({
  isOpen,
  onClose,
  availableMaterias,
  semestreIndex,
}) => {
  const { control } = useFormContext();
  const [materiaId, setMateriaId] = useState<number | null>(null);

  const { append: addMateria } = useFieldArray({
    control: control,
    name: `detalles.${semestreIndex}.materias`,
  });

  const handleConfirm = () => {
    const selectedMateria = availableMaterias.find(
      (available) => available.id === materiaId
    );
    if (selectedMateria) {
      addMateria(selectedMateria);
      setMateriaId(null);
      onClose();
    } else {
      throw new Error(
        `Selected materia undefined, se seleccionó una materia que no está en la lista de materias disponibles`
      );
    }
  };

  const handleCancel = () => {
    setMateriaId(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold mb-4">
            Seleccionar Materia
          </DialogTitle>
        </DialogHeader>
        <FormLabel>Materia</FormLabel>
        <Combobox
          fieldValue={materiaId}
          options={availableMaterias.map((m) => ({
            label: `${m.codigo}  ${m.nombre}`,
            value: m.id,
          }))}
          onSelect={(value: number) => setMateriaId(value)}
        />

        <DialogFooter>
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleConfirm} disabled={!materiaId}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MateriaDialog;
