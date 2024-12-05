import { FlatList, View } from "react-native";
import { useState } from "react";
import { Header } from "@/components/header";
import { Highlight } from "@/components/highlight";
import { GroupCard } from "@/components/group-card";


export default function Index() {
    const [groups, setGroups] = useState<string[]>([
        'Galera da React',
        'Galera do React Native',
        'Galera da Curso',
    ])

    return (
        <View className="flex-1 bg-gray-600 p-6">
            <Header />
            <Highlight title="Turmas" subtitle="Jogue com a sua turma" />
            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => <GroupCard title={item} />}
                contentContainerStyle={{ gap: 12 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}