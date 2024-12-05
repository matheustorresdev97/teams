import { FlatList, View } from "react-native";
import { useState } from "react";
import { Header } from "@/components/header";
import { Highlight } from "@/components/highlight";
import { GroupCard } from "@/components/group-card";
import { ListEmpty } from "@/components/list-empty";
import { Button } from "@/components/button";
import { router, useRouter } from "expo-router";


export default function Index() {

    const [groups, setGroups] = useState<string[]>([])

    const router = useRouter();

    function handleNewGroup() {
        router.push('/new-group');
    }

    return (
        <View className="flex-1 bg-gray-600 p-6">
            <Header />
            <Highlight title="Turmas" subtitle="Jogue com a sua turma" />
            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => <GroupCard title={item} />}
                contentContainerStyle={groups.length === 0 ? { flex: 1 } : { gap: 12 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <ListEmpty message="Que tal cadastrar a primeira turma?" />
                )}
            />

            <Button title="Criar nova turma" onPress={handleNewGroup} />
        </View>
    )
}