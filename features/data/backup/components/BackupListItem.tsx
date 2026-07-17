import { MenuCard } from "@/components/cards/MenuCard";

import { BackupFile } from "../backup.types";

type Props = {
  backup: BackupFile;

  onPress(): void;
};

export function BackupListItem({ backup, onPress }: Props) {
  return (
    <MenuCard
      title={backup.name}
      subtitle={`${backup.createdAt.toLocaleString()} • ${(backup.size / 1024).toFixed(1)} KB`}
      onPress={onPress}
    />
  );
}
